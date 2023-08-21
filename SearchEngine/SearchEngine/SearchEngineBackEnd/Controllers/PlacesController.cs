using CafeSearchBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Numerics;
using static System.Net.WebRequestMethods;

[ApiController]
[Route("api/places")]
public class PlacesController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly string _tomtomApiKey;
    private readonly string _opencageApiKey;
    private readonly HttpClient _httpClient;
    private readonly IConfiguration configuration;
    public PlacesController(IHttpClientFactory httpClientFactory, HttpClient httpClient, IConfiguration configuration)
    {

        _httpClientFactory = httpClientFactory;
        _tomtomApiKey = "khMZiD1UXiU7zcQqQnvKlAarGCLc4GOh"; // Replace with your TomTom API key
        _opencageApiKey = "0c0da2e767b44e3eb0c0ab9f9023e54a"; // Replace with your OpenCage API key
        _httpClient = httpClient;
        this.configuration = configuration;
    }

    //[ProducesResponseType()]
    [HttpGet("{placeType}/{locationName}")]
    public async Task<IActionResult> GetPlaces(string placeType, string locationName)
    {
        var httpClient = _httpClientFactory.CreateClient();

        // Use the OpenCage API to convert the provided location name into latitude and longitude
        var opencageBaseUrl = "https://api.opencagedata.com/geocode/v1/json";
        var opencageParams = $"q={Uri.EscapeDataString(locationName)}&key={_opencageApiKey}";
        var opencageResponse = await httpClient.GetAsync($"{opencageBaseUrl}?{opencageParams}");
        if (opencageResponse.IsSuccessStatusCode)
        {
            var opencageContent = await opencageResponse.Content.ReadAsStringAsync();
            var opencageResult = JsonConvert.DeserializeObject<OpenCageApiResponse>(opencageContent);

            if (opencageResult.Results.Count > 0)
            {
                var firstResult = opencageResult.Results[0];
                double latitude = firstResult.Geometry.Lat;
                double longitude = firstResult.Geometry.Lng;
                var tomTomResponse = await httpClient.GetAsync($"https://api.tomtom.com/search/2/nearbySearch/name={placeType}.json?key={_tomtomApiKey}&lat={latitude}&lon={longitude}");

                if (tomTomResponse.IsSuccessStatusCode)
                {
                    var tomTomContent = await tomTomResponse.Content.ReadAsStringAsync();
                    var tomTomResponseJson = JObject.Parse(tomTomContent);
                    if (tomTomResponseJson["results"] is JArray resultsArray)
                    {
                        var places = new List<PlaceInfo>();

                        foreach (var result in resultsArray)
                        {

                            var address = result["address"];
                            var pois = result["poi"];
                            if (address != null  && pois != null)
                            {
                                var name = pois["name"]?.ToString();
                                var addressValue = address["freeformAddress"].ToString();

                                if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(addressValue))
                                {
                                    places.Add(new PlaceInfo
                                    {
                                        Name = name,
                                        Address = addressValue
                                    });
                                }
                                
                            }
                        }
                        return Ok(places);
                    }
                }
               
            }
        }
        return BadRequest("Error fetching places from the API");
    }
    



}
