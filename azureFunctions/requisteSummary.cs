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
    public static class RequisteSummary
    {
        [FunctionName("RequisteSummary")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            // TODO: use static client 
            [CosmosDB(
                databaseName: "AnteaterDeclassified",
                collectionName: "CourseCatalog",
                ConnectionStringSetting = "CosmosDBConnection")] DocumentClient client,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string course = req.Query["course"].ToString() ?? "";
            log.LogInformation($"Class Size Summary Query on course: {course}");


            Uri collectionUri = UriFactory.CreateDocumentCollectionUri("AnteaterDeclassified", "CourseCatalog");
            IQueryable<CourseCatalog> postReqQuery = client.CreateDocumentQuery<CourseCatalog>(collectionUri, new SqlQuerySpec
            {
                // TODO: what a yikes of a query... should probably redesign/make-new tables to support this better
                QueryText = "SELECT c.course FROM c where ARRAY_CONTAINS(c.prereqList, @course) or ARRAY_CONTAINS(c.prereqCoreqList, @course) or ARRAY_CONTAINS(c.coreqList, @course)",
                Parameters = new SqlParameterCollection()
                    {
                        new SqlParameter("@course", course)
                    }
            }, new FeedOptions { EnableCrossPartitionQuery = true });   // TODO: cross partition query can be expensive, current 5k rows is decently fast 

            var postReqResults = postReqQuery
                .AsEnumerable()
                .Select(x => x.Course);
            
            foreach (var postReqResult in postReqResults)
            {
                Console.WriteLine($"PostReqs: {postReqResult}");
            }

            IQueryable<CourseCatalog> preReqQuery = client.CreateDocumentQuery<CourseCatalog>(collectionUri, new SqlQuerySpec
            {
                QueryText = "select c.prereqList, c.prereqCoreqList, c.CoreqList from c where c.course = @course",
                Parameters = new SqlParameterCollection()
                    {
                        new SqlParameter("@course", course)
                    }
            });

            var preReqQueryFirst = preReqQuery.ToList().FirstOrDefault();

            var preReqResults = (preReqQueryFirst.PrereqList ?? Enumerable.Empty<string>())
                .Concat((preReqQueryFirst.PrereqCoreqList ?? Enumerable.Empty<string>()))
                .Concat((preReqQueryFirst.CoreqList ?? Enumerable.Empty<string>()));
                
            foreach (var preReqResult in preReqResults)
            {
                Console.WriteLine($"PostReqs: {preReqResult}");
            }

            var result = new {
                preReqs = preReqResults,
                postReqs = postReqResults
            };

            return new OkObjectResult(JsonConvert.SerializeObject(result));
        }
    }
}
