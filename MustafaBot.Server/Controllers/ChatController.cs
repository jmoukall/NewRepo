using Microsoft.AspNetCore.Mvc;

namespace MustafaBot.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromBody] ChatRequest request)
        {
            // For now, return a dummy answer
            var response = new ChatResponse
            {
                Reply = $"You asked: '{request.Message}'. MustafaBot says: Inshallah, I will answer that soon!"
            };
            return Ok(response);
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }

    public class ChatResponse
    {
        public string Reply { get; set; }
    }
}