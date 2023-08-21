using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace CafeSearchBackEnd.Models
{
    public class PlaceInfo
    {
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Type { get; set; }
    }
   public class OpenCageApiResponse
{
    public List<Result> Results { get; set; }
    
}

    public class Result
    {
        public Geometry Geometry { get; set; }
    }
 
    public class Geometry
    {
        public double Lat { get; set; }
        public double Lng { get; set; }
    }

   

    public class TomTomApiResponse
    {
        public List<TomTomPlaceResult> Summary { get; set; }
    }

    public class TomTomPlaceResult
    {
        public string Name { get; set; }
        public string Address { get; set; }

    }
   

}
