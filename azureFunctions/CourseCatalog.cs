using Newtonsoft.Json;

namespace AnteaterDeclassified.WebSoc
{
    public class CourseCatalog
    {
        [JsonProperty("course")]
        public string Course { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("units")]
        public string Units { get; set; }

        [JsonProperty("desc")]
        public string Desc { get; set; }

        [JsonProperty("prereqStr")]
        public string PrereqStr { get; set; }

        [JsonProperty("prereqList")]
        public string[] PrereqList { get; set; }

        [JsonProperty("coreqStr")]
        public string CoreqStr { get; set; }

        [JsonProperty("coreqList")]
        public string[] CoreqList { get; set; }

        [JsonProperty("repeatStr")]
        public string RepeatStr { get; set; }

        [JsonProperty("concurrentWithStr")]
        public string ConcurrentWithStr { get; set; }

        [JsonProperty("concurrentWiths")]
        public string ConcurrentWiths { get; set; }

        [JsonProperty("restrictStr")]
        public string RestrictStr { get; set; }

        [JsonProperty("gradeOptionStr")]
        public string GradeOptionStr { get; set; }
        
        [JsonProperty("sameAsStr")]
        public string SameAsStr { get; set; }

        [JsonProperty("sameAsList")]
        public string[] SameAsList { get; set; }

        [JsonProperty("overlapsWithStr")]
        public string OverlapsWithStr { get; set; }

        [JsonProperty("overlapsWithList")]
        public string[] OverlapsWithList { get; set; }

        [JsonProperty("breadthCodeStr")]
        public string BreadthCodeStr { get; set; }

        [JsonProperty("designUnitsStr")]
        public string DesignUnitsStr { get; set; }
    }
}