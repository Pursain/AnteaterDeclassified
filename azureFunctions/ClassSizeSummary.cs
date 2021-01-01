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
    public static class ClassSizeSummary
    {
        [FunctionName("ClassSizeSummary")]
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
            log.LogInformation($"Class Size Summary Query on course: {course}");

            Uri collectionUri = UriFactory.CreateDocumentCollectionUri("AnteaterDeclassified", "CourseOffering");
            IQueryable<CourseOffering> query = client.CreateDocumentQuery<CourseOffering>(collectionUri, new SqlQuerySpec
            {
                // TODO: verify c.type=Lec is correct behavior, may not be for some non-lec courses e.g. CS190
                QueryText = "SELECT c.term, c.year, c.enr, c.max FROM c where c.course = @course and c.type = 'Lec'",
                Parameters = new SqlParameterCollection()
                    {
                        new SqlParameter("@course", course)
                    }
            });

            var results = query
                .AsEnumerable() // end deferred execution here to use group by
                .GroupBy(
                    x => x.Term,
                    (_, list) => list.OrderByDescending(x => x.Year).First())   // Get stats on the latest year
                .Select(
                    x => new 
                    {
                        term = x.Term,
                        year = x.Year,
                        enrolled = x.Enr,
                        max = x.Max
                    }
                );

            foreach (var result in results)
            {
                Console.WriteLine(result.term + " : " + result.year + " : " + result.enrolled + " : " + result.max);
            }

            return new OkObjectResult(JsonConvert.SerializeObject(results));
        }
    }
}
