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
        var tomTomApiKey = configuration.GetSection("TomTomApiKey").Value;
        var openCageApiKey = configuration.GetSection("OpenCageApiKey").Value;
        _httpClientFactory = httpClientFactory;
        _tomtomApiKey = tomTomApiKey; // Replace with your TomTom API key
        _opencageApiKey = openCageApiKey;  // Replace with your OpenCage API key
        _httpClient = httpClient;
        this.configuration = configuration;
    }

  
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
    [HttpGet("News")]

    public async Task<IActionResult> DailyNews(string location)
    {
        var Newsapikey = configuration.GetSection("NewsapiKey").Value;
        var apiKey = Newsapikey;
        var client = _httpClientFactory.CreateClient();
        var date = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd");
        string endpoint = $"https://gnews.io/api/v4/search?q={location}&apikey={apiKey}";
        var response = await client.GetAsync(endpoint);

        if (response.IsSuccessStatusCode)
        {

            string responsebody = await response.Content.ReadAsStringAsync();
            var news = JObject.Parse(responsebody);
            if (news["articles"] is JArray resultsArray)
            {
                var data = new List<News>();

                foreach (var result in resultsArray)
                {
                    var title = result["title"].ToString();
                    var description = result["description"].ToString();
                    var image = result["image"].ToString();
                    var url = result["url"].ToString();
                    data.Add(new News
                    {
                        title = title,
                        description = description,
                        image = image,
                        url = url
                    }); ;
                }
                return Ok(data);
            }


        }
        return BadRequest("there is some error ");
    }
    [HttpGet("Exercise")]
    public async Task<IActionResult> GetExercisesAsync(string name)
    {

        var exerciseApiKey = configuration.GetSection("ExerciseApiKey").Value;
        string apiKey = exerciseApiKey; // Replace with your actual API key

        var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);

        string apiEndpoint = $"https://api.api-ninjas.com/v1/exercises?muscle={name}";
        HttpResponseMessage response = await client.GetAsync(apiEndpoint);

        if (response.IsSuccessStatusCode)
        {

            string responseBody = await response.Content.ReadAsStringAsync();
            var exercises = JsonConvert.DeserializeObject<List<Exercise>>(responseBody);

            var simplifiedExercises = exercises.Select(e => new
            {
                e.name,
                e.difficulty,
                e.equipment,
                e.instructions
            }).ToList();

            return Ok(simplifiedExercises);
        }
        else
        {
            return BadRequest("there is some error");
        }

    }




}
