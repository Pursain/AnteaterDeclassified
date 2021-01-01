using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Linq;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;

namespace AnteaterDeclassified.WebSoc
{
    public static class TermSummary
    {
        [FunctionName("TermSummary")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            // TODO: use static client 
            [CosmosDB(
                databaseName: "AnteaterDeclassified",
                collectionName: "CourseOffering",
                ConnectionStringSetting = "CosmosDBConnection")] DocumentClient client,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string course = req.Query["course"].ToString() ?? "";
            log.LogInformation($"TermSummary Query on course: {course}");

            Uri collectionUri = UriFactory.CreateDocumentCollectionUri("AnteaterDeclassified", "CourseOffering");
            IQueryable<CourseOffering> query = client.CreateDocumentQuery<CourseOffering>(collectionUri, new SqlQuerySpec
            {
                // TODO: verify c.type=Lec is correct behavior, may not be for some non-lec courses
                QueryText = "select distinct value {term : c.term, year: c.year} from c where c.course = @course and c.type = 'Lec'",
                Parameters = new SqlParameterCollection()
                    {
                        new SqlParameter("@course", course)
                    }
            });

            var results = query
                .AsEnumerable() // end deferred execution here to use group by
                .GroupBy(
                    x => x.Term,
                    x => x.Year,
                    (key, years) => new
                    {
                        term = key,
                        count = years.Count(),
                        years = years.OrderByDescending(_ => _).ToList()
                    });

            foreach (var result in results)
            {
                Console.WriteLine(result.term + " : " + result.count + " : " + result.years);
            }

            return new OkObjectResult(JsonConvert.SerializeObject(results));
        }
    }
}
