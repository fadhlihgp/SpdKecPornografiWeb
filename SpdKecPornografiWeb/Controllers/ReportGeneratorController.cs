using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;

namespace SpdKecPornografiWeb.Controllers;

public class ReportGeneratorController : Controller
{
    private readonly IQuestionService _questionService;

    public ReportGeneratorController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    public async Task<IActionResult> GenerateQuestionList()
    {
        var questions = await _questionService.FindQuestions("");
        return View(questions);
    }
    
    public async Task<IActionResult> Index()
    {
        var questions = await _questionService.FindQuestions("");
        return View(questions);
    }
}