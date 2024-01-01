using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Authorize]
[Route("api/question")]
public class QuestionController : ControllerBase
{
    private readonly IQuestionService _questionService;

    public QuestionController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpPost]
    public async Task<IActionResult> AddQuestion([FromBody] QuestionRequestDto questionRequestDto)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _questionService.AddQuestionAsync(accountId, questionRequestDto);
        return Created("api/question", new
        {
            message = "Berhasil menambah data pertanyaan baru"
        });
    }

    [HttpGet]
    public async Task<IActionResult> FindQuestion([FromQuery] string? name)
    {
        var questionResponseDtos = await _questionService.FindQuestions(name);
        return Ok(new
        {
            message = "Berhasil mendapatkan data pertanyaan",
            data = questionResponseDtos
        });
    }

    [HttpGet("generateCode")]
    public Task<IActionResult> GenerateCode()
    {
        return Task.FromResult<IActionResult>(Ok(new
        {
            message = "Kode berhasil dibuat",
            data = _questionService.GenerateQuestionCode()
        }));
    }
    
    [HttpGet("{questionId}")]
    public async Task<IActionResult> FindQuestionById([FromRoute] string questionId)
    {
        var question = await _questionService.FindQuestionById(questionId);
        return Ok(new
        {
            message = "Berhasil mendapatkan data pertanyaan",
            data = question
        });
    }
    
    [HttpPut("{questionId}")]
    public async Task<IActionResult> UpdateQuestion([FromRoute] string questionId, [FromBody] QuestionRequestDto questionRequestDto)
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        await _questionService.UpdateQuestionAsync(accountId, questionId, questionRequestDto);
        return Ok(new
        {
            message = "Berhasil memperbarui data pertanyaan"
        });
        
    }

    [HttpDelete("{questionId}")]
    public async Task<IActionResult> DeleteQuestion([FromRoute] string questionId)
    {
        await _questionService.DeleteQuestion(questionId);
        return Ok(new { message = "Berhasil menghapus data pertanyaan" });
    }
}