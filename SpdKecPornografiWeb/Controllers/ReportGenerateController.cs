using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;

namespace SpdKecPornografiWeb.Controllers;

public class ReportGenerateController : Controller
{
    private readonly IQuestionService _questionService;
    private readonly IAnswerService _answerService;
    private readonly IDiagnosisService _diagnosisService;
    private readonly IAnswerDiagnosisService _answerDiagnosisService;
    private readonly IResultHistoryService _result;

    public ReportGenerateController(IQuestionService questionService, IAnswerService answerService, IDiagnosisService diagnosisService, IAnswerDiagnosisService answerDiagnosisService, IResultHistoryService result)
    {
        _questionService = questionService;
        _answerService = answerService;
        _diagnosisService = diagnosisService;
        _answerDiagnosisService = answerDiagnosisService;
        _result = result;
    }

    public async Task<IActionResult> GenerateQuestionList()
    {
        var questions = await _questionService.FindQuestions("");
        return View(questions.ToList());
    }

    public async Task<IActionResult> GenerateAnswerList()
    {
        var answers = await _answerService.FindAnswers("");
        return View(answers.ToList());
    }

    public async Task<IActionResult> GenerateDiagnosisList()
    {
        var diagnosisList = await _diagnosisService.FindDiagnosis("");
        return View(diagnosisList.ToList());
    }

    public async Task<IActionResult> GenerateRelationList()
    {
        var relations = await _answerDiagnosisService.FindAllAnswerDiagnosisAsync("");
        return View(relations.ToList());
    }

    // [Route("{accountId}")]
    public async Task<IActionResult> GenerateTestingHistories()
    {
        var histories = await _result.GetAllResultHistories("d941614b-4e34-42cc-bf68-f2f599c3cf85", null);
        return View(histories.ToList());
    }

    // [Route("{id}")]
    public async Task<IActionResult> GenerateDetailTesting()
    {
        var result = await _result.GetResultHistoryById("9589b5de-735a-4abd-81a9-302981487bcb");
        return View(result);
    }
}