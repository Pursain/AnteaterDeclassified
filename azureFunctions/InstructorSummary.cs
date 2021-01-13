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
    public static class InstructorSummary
    {
        [FunctionName("InstructorSummary")]
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
            log.LogInformation($"Instructor Summary Query on course: {course}");

            Uri collectionUri = UriFactory.CreateDocumentCollectionUri("AnteaterDeclassified", "CourseOffering");
            IQueryable<CourseOffering> query = client.CreateDocumentQuery<CourseOffering>(collectionUri, new SqlQuerySpec
            {
                // TODO: verify c.type=Lec is correct behavior, may not be for some non-lec courses e.g. CS190
                QueryText = "SELECT c.instructor, c.term FROM c where c.course = @course and c.type = 'Lec'",
                Parameters = new SqlParameterCollection()
                    {
                        new SqlParameter("@course", course)
                    }
            });

            var results = query
                .AsEnumerable() // end deferred execution here to use group by
                .GroupBy(
                    x => x.Instructor,
                    x => x.Term,
                    (key, terms) => new
                    {
                        instructor = key,
                        spring = terms.Count( x => x == "Spring"),
                        summerSession1 = terms.Count( x => x == "Summer Session 1"),
                        summerSession2 = terms.Count( x => x == "Summer Session 2"),
                        fall = terms.Count( x => x == "Fall"),
                        winter = terms.Count( x => x == "Winter"),
                        summerQuarterCom = terms.Count( x => x == "Summer Quarter (Com)"),
                        summer10wk = terms.Count( x => x == "Summer 10wk"),
                    });

            foreach (var result in results)
            {
                Console.WriteLine(result.instructor + "\t: " + result.spring + " : " + result.summerSession1 + " : " + result.summerSession2 + " : " + result.fall + " : " + result.winter + " : " + result.summerQuarterCom + " : " + result.summer10wk);
            }

            return new OkObjectResult(JsonConvert.SerializeObject(results));
        }
    }
}
