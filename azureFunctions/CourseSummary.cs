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
    public static class CourseSummary
    {
        [FunctionName("CourseSummary")]
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
            // TODO: return no input error
            log.LogInformation($"Course Summary Query on course: {course}");

            Uri collectionUri = UriFactory.CreateDocumentCollectionUri("AnteaterDeclassified", "CourseCatalog");
            IQueryable<CourseCatalog> query = client.CreateDocumentQuery<CourseCatalog>(collectionUri, new SqlQuerySpec
            {
                QueryText = "select * from c where c.course = @course",
                Parameters = new SqlParameterCollection()
                    {
                        new SqlParameter("@course", course)
                    }
            });

            var queryFirst = query
                .AsEnumerable()
                .SingleOrDefault();

            return new OkObjectResult(JsonConvert.SerializeObject(queryFirst));
        }
    }
}
