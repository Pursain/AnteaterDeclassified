using Newtonsoft.Json;

namespace AnteaterDeclassified.WebSoc
{
    public class CourseOffering
    {
        [JsonProperty("course")]
        public string Course { get; set; }

        [JsonProperty("yearTerm")]
        public string YearTerm { get; set; }

        [JsonProperty("term")]
        public string Term { get; set; }

        [JsonProperty("year")]
        public string Year { get; set; }
        
        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("sec")]
        public string Sec { get; set; }

        [JsonProperty("units")]
        public string units { get; set; }

        [JsonProperty("instructor")]
        public string Instructor { get; set; }

        [JsonProperty("time")]
        public string Time { get; set; }

        [JsonProperty("place")]
        public string Place { get; set; }

        [JsonProperty("final")]
        public string Final { get; set; }

        [JsonProperty("max")]
        public string Max { get; set; }

        [JsonProperty("enr")]
        public string Enr { get; set; }

        [JsonProperty("req")]
        public string Req { get; set; }

        [JsonProperty("rstr")]
        public string Rstr { get; set; }

        [JsonProperty("textbooks")]
        public string Textbooks { get; set; }

        [JsonProperty("web")]
        public string Web { get; set; }
    }
}