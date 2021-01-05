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
using System.Net.Http;
using System.Collections.Generic;
using System.Net;
using Newtonsoft.Json.Linq;


// TODO: also query raw course code without dept prefix

namespace AnteaterDeclassified.WebSoc
{
    public static class RMPSummary
    {
        private static HttpClient httpClient = new HttpClient();
        private static IDictionary<string, string[]> courseToRMPCourseDict = new Dictionary<string, string[]>()
        {
            {"AC ENG",  new string[] { "ACENG", "AE", "ENG" }},
            {"AFAM",    new string[] { "AFAM" }},
            {"ANATOMY", new string[] { "ANATOMY" }},
            {"ANTHRO",  new string[] { "ANTHRO", "ANTHR", "ANTH" }},
            {"ARABIC",  new string[] { "ARABIC", "ARB" }},
            {"ARMN",    new string[] { "ARMN" }},
            {"ART",     new string[] { "ART" }},
            {"ART HIS", new string[] { "ARTHIS", "AH", "ART", "ARTHI" }},
            {"ARTS",    new string[] { "ARTS", "ART" }},
            {"ASIANAM", new string[] { "ASIANAM", "ASAM" }},
            {"BANA",    new string[] { "BANA" }},
            {"BATS",    new string[] { "BATS"}},
            {"BIO SCI", new string[] { "BIOSCI", "BS", "BIO" }},
            {"BIOCHEM", new string[] { "BIOCHEM", "BC", "BIO" }},
            {"BME",     new string[] { "BME" }},
            {"BSEMD",   new string[] { "BSEMD" }},
            {"CBE",     new string[] { "CBE" }},
            {"CBEMS",   new string[] { "CBEMS" }},
            {"CHC/LAT", new string[] { "CHCLAT", "CL", "CHC", "CH", "CHIC", "CHICA", "CHICANO",  "CHLA",  "CHICLAT", "CLS" }},
            {"CHEM",    new string[] { "CHEM" }},
            {"CHINESE", new string[] { "CHINESE", "CHIN", "CH", "CHI" }},
            {"CLASSIC", new string[] { "CLASSIC", "CLA", "CLAS", "CLASS" }},
            {"CLT&THY", new string[] { "CLTTHY", "CT" }},
            {"COGS",    new string[] { "COGS" }},
            {"COM LIT", new string[] { "COMLIT", "CL", "CLIT", "COMPLIT"}},
            {"COMPSCI", new string[] { "COMPSCI", "CS" }},
            {"CRITISM", new string[] { "CRITISM" }},
            {"CRM/LAW", new string[] { "CRMLAW", "CL", "CRIM", "CRM" }},
            {"CSE",     new string[] { "CSE" }},
            {"DANCE",   new string[] { "DANCE" }},
            {"DEV BIO", new string[] { "DEVBIO", "DB" }},
            {"DRAMA",   new string[] { "DRAMA" }},
            {"EARTHSS", new string[] { "EARTHSS", "ESS" }},
            {"EAS",     new string[] { "EAS", "EASIAN" }},
            {"ECO EVO", new string[] { "ECO EVO", "EE" }},
            {"ECON",    new string[] { "ECON" }},
            {"ECPS",    new string[] { "ECPS" }},
            {"EDUC",    new string[] { "EDUC", "ED", "EDU" }},
            {"EECS",    new string[] { "EECS" }},
            {"ENGLISH", new string[] { "ENGLISH", "ENG" }},
            {"ENGR",    new string[] { "ENGR", "ENG" }},
            {"ENGRCEE", new string[] { "ENGRCEE", "ENG", "ENGR"}},
            {"ENGRMAE", new string[] { "ENGRMAE", "ENG", "ENGR" }},
            {"EPIDEM",  new string[] { "EPIDEM" }},
            {"EURO ST", new string[] { "EUROST", "ET" }},
            {"FIN",     new string[] { "FIN" }},
            {"FLM&MDA", new string[] { "FLMMDA", "FM", "FILM", "FLM", "FLMMD", "FMS" }},
            {"FRENCH",  new string[] { "FRENCH", "FR", "FREN", "FRENC", "FRNCH" }},
            {"GEN&SEX", new string[] { "GENSEX", "GS", "GSS"}},
            {"GERMAN",  new string[] { "GERMAN", "GERM" }},
            {"GLBL ME", new string[] { "GLBL ME", "GM" }},
            {"GLBLCLT", new string[] { "GLBLCLT","GC", "GLC" }},
            {"GREEK",   new string[] { "GREEK", "GRK" }},
            {"HEBREW",  new string[] { "HEBREW" }},
            {"HISTORY", new string[] { "HISTORY", "HIST", "HIS" }},
            {"HUMAN",   new string[] { "HUMAN", "HUM", "HUMCORE", "HUMANCO" }},
            {"I&C SCI", new string[] { "ICS" }},
            {"IN4MATX", new string[] { "IN4MATX", "INF", "IN4MTX" }},
            {"INTL ST", new string[] { "INTLST", "IS", "INTST", "INT" }},
            {"IRAN",    new string[] { "IRAN" }},
            {"ITALIAN", new string[] { "ITALIAN", "ITA", "ITAL" }},
            {"JAPANSE", new string[] { "JAPANSE", "JAP", "JPN", "JP", "JAPAN", "JAPANESE"}},
            {"KOREAN",  new string[] { "KOREAN", "KOR" }},
            {"LATIN",   new string[] { "LATIN" }},
            {"LINGUIS", new string[] { "LINGUIS", "LING", "LSCI", "LINGUISTICS" }},
            {"LIT JRN", new string[] { "LITJRN", "LJ", "LITJ" }},
            {"LPS",     new string[] { "LPS" }},
            {"LSCI",    new string[] { "LSCI" }},
            {"M&MG",    new string[] { "MMG", "M" }},
            {"MATH",    new string[] { "MATH" }},
            {"MGMT",    new string[] { "MGMT", "MANAGEMENT" }},
            {"MGMT EP", new string[] { "MGMTEP" }},
            {"MGMT FE", new string[] { "MGMTFE" }},
            {"MGMT HC", new string[] { "MGMTHC" }},
            {"MGMTMBA", new string[] { "MGMTMBA" }},
            {"MGMTPHD", new string[] { "MGMTPHD" }},
            {"MOL BIO", new string[] { "MOL BIO", "MB" }},
            {"MPAC",    new string[] { "MPAC" }},
            {"MSE",     new string[] { "MSE" }},
            {"MUSIC",   new string[] { "MUSIC", "MUS", "MUSICTHEORY" }},
            {"NET SYS", new string[] { "NETSYS" }},
            {"NEURBIO", new string[] { "NEURBIO" }},
            {"NUR SCI", new string[] { "NURSCI", "NS" }},
            {"PATH",    new string[] { "PATH" }},
            {"PED GEN", new string[] { "PEDGEN", "PG" }},
            {"PERSIAN", new string[] { "PERSIAN" }},
            {"PHARM",   new string[] { "PHARM" }},
            {"PHILOS",  new string[] { "PHILOS", "PHIL", "PHILO", "PHILOSOPHY" }},
            {"PHRMSCI", new string[] { "PHRMSCI", "PS", "PHARMSCI", "PHARM", "PHRMS"}},
            {"PHY SCI", new string[] { "PHYSCI", "PS", "PHY", "PHYS", "PHYSC" }},
            {"PHYSICS", new string[] { "PHYSICS", "PHYS" }},
            {"PHYSIO",  new string[] { "PHYSIO" }},
            {"POL SCI", new string[] { "POL SCI", "PS", "POLISCI" }},
            {"PORTUG",  new string[] { "PORTUG", "PORTUGUESE" }},
            {"PP&D",    new string[] { "PPD" }},
            {"PSCI",    new string[] { "PSCI", "PS", "PSB" }},
            {"PSYCH",   new string[] { "PSYCH", "PSYC" }},
            {"PUB POL", new string[] { "PUBPOL", "PP" }},
            {"PUBHLTH", new string[] { "PUBHLTH", "PH", "PUBHEALTH", "PUBLICHEALTH"}},
            {"REL STD", new string[] { "RELSTD", "PS", "REL", "RELST", "RELSTUDIES" }},
            {"ROTC",    new string[] { "ROTC" }},
            {"RUSSIAN", new string[] { "RUSSIAN", "RUS", "RUSS" }},
            {"SOC SCI", new string[] { "SOCSCI", "SOC", "SS" }},
            {"SOCECOL", new string[] { "SOCECOL", "SOC", "SE", "SE", "SOECOL" }},
            {"SOCIOL",  new string[] { "SOCIOL", "SOC", "SOCIO", "SOCIOLOGY"}},
            {"SPANISH", new string[] { "SPANISH", "SPAN", "SP" }},
            {"SPPS",    new string[] { "SPPS" }},
            {"STATS",   new string[] { "STATS", "STAT" }},
            {"SWE",     new string[] { "SWE" }},
            {"TOX",     new string[] { "TOX" }},
            {"UCDC",    new string[] { "UCDC" }},
            {"UNI AFF", new string[] { "UNIAFF" }},
            {"UNI STU", new string[] { "UNISTU", "UNI", "UNIST", "UNISTUDIES" }},
            {"UPPP",    new string[] { "UPPP" }},
            {"VIETMSE", new string[] { "VIETMSE", "VIET" }},
            {"VIS STD", new string[] { "VISSTD", "VS"}},
            {"WRITING", new string[] { "WRITING", "WR", "WRITING", "WRIT", "WRITI" }
        }};

        [FunctionName("RMPSummary")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string instructor = req.Query["instructor"].ToString();
            string course = req.Query["course"].ToString();

            log.LogInformation($"RMPSummary Query on : {course} & {instructor}");

            try
            {
                validateFormatInstructorFormat(instructor);
                validateFormatCourse(course);
            }
            catch (Exception error)
            {
                return new BadRequestObjectResult(error.Message);
            }


            (string firstNameInitial, string lastName) = splitInstuctorName(instructor);
            (string dept, string courseNum) = splitCourseCode(course);


            JObject teacherRatingJObject = await fetchTeacherRatingAsync(lastName, firstNameInitial);
            if (teacherRatingJObject == null)
                return new BadRequestObjectResult($"Instructor {instructor} not found.");
            string rmpTeacherID = (string)teacherRatingJObject?["pk_id"];


            string[] rmpCourses = generateRmpCourseNames(dept, courseNum);
            JObject courseRatingJObject = await fetchCourseRatingAsync(rmpCourses, rmpTeacherID);


            // TODO: add format function to trim-down/rename json to just relevant information
            JObject resultjJObject = new JObject();
            resultjJObject.Merge(teacherRatingJObject);
            resultjJObject.Merge(courseRatingJObject);

            return new OkObjectResult(resultjJObject);
        }

        private static async Task<JObject> fetchCourseRatingAsync(string[] rmpCourses, string rmpTeacherID)
        {
            JObject resultJObject = new JObject();
            JArray ratingAccumulator = new JArray();

            foreach (string rmpCourse in rmpCourses)
            {
                var response = await httpClient.GetAsync($"https://www.ratemyprofessors.com/paginate/professors/ratings?tid={rmpTeacherID}&filter=courseCodes&courseCode={rmpCourse}&page=1");

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    JObject jObject = JObject.Parse(responseBody);
                    JArray ratings = (JArray)jObject?["ratings"];
                    ratingAccumulator.Merge(ratings);
                }

                if (ratingAccumulator.Count >= 20){
                    break;
                }
            }
            
            resultJObject.Add("ratings", ratingAccumulator);
            return resultJObject;
        }

        private static async Task<JObject> fetchTeacherRatingAsync(string instructorLastName, string firstNameInitial)
        {
            var response = await httpClient.GetAsync($"https://solr-aws-elb-production.ratemyprofessors.com//solr/rmp/select/?solrformat=true&rows=20&wt=json&q=teacherlastname_t%3A{instructorLastName}+AND+teacherfirstname_t%3A*{firstNameInitial}*+AND+schoolid_s%3A1074&defType=edismax&qf=teacherfirstname_t%5E2000+teacherlastname_t%5E2000+teacherfullname_t%5E2000&bf=pow(total_number_of_ratings_i%2C2.1)&sort=total_number_of_ratings_i+desc&siteName=rmp");
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                return (JObject)JObject.Parse(responseBody)?["response"]?["docs"]?.FirstOrDefault();
            }
            else
            {
                throw new Exception("SOLR endpoint failed");
            }
        }

        private static string[] generateRmpCourseNames(string dept, string courseNum)
        {
            string[] rmpCoursePrefixes = courseToRMPCourseDict[dept];
            return rmpCoursePrefixes
                .Select(x => $"{x}{courseNum}")
                .ToArray();
        }

        private static (string firstNameInitial, string lastName) splitInstuctorName(string instructor)
        {
            if (instructor == null)
                throw new Exception("Missing instructor arg");

            string[] splitName = instructor.Split(",");

            if (splitName.Length != 2 || !splitName[1].Contains("."))
                throw new Exception($"Invalid instructor name format: {instructor}, expected: 'lastname, firstnameinitial.'");

            string lastName = instructor.Split(",")[0];
            string firstNameInitial = instructor.Split(",")[1];
            firstNameInitial = firstNameInitial
                                    .Substring(0, firstNameInitial.Length - 1) // remove period   
                                    .Trim()
                                    .ToLower();
            return (firstNameInitial, lastName);
        }

        private static (string dept, string courseNum) splitCourseCode(string course)
        {
            if (course == null)
                throw new Exception("Missing course arg");

            int numOfTokens = course.Split(' ').Count();

            if (numOfTokens == 1)
                throw new Exception($"Invalid course name: {course}");

            string dept = course
                .Split(' ')
                .Take(numOfTokens - 1)
                .Aggregate((acc, a) => acc + " " + a);

            string courseNum = course
                .Split(' ')
                .LastOrDefault();

            return (dept, courseNum);
        }

        private static void validateFormatCourse(string course)
        {
            (string dept, string courseNum) = splitCourseCode(course);

            if (!courseToRMPCourseDict.Keys.Contains(dept))
                throw new Exception($"Invalid course name: {course}");
        }

        // Assumed format: "Pattis, R."
        private static void validateFormatInstructorFormat(string instructor)
        {
            splitInstuctorName(instructor);
        }
    }
}
