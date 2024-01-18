using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpdKecPornografiWeb.Services.Interfaces;

namespace SpdKecPornografiWeb.Controllers;

[ApiController]
[Route("api/report")]
[Authorize]
public class ReportController : ControllerBase
{
    private readonly IRazorViewTemplateService _razorViewTemplateService;
    private readonly IQuestionService _questionService;
    private readonly IAnswerService _answerService;
    private readonly IPdfService _pdfService;
    private readonly IDiagnosisService _diagnosisService;
    private readonly IAnswerDiagnosisService _answerDiagnosisService;
    private readonly IResultHistoryService _resultHistoryService;

    public ReportController(IQuestionService questionService, IRazorViewTemplateService razorViewTemplateService, IPdfService pdfService, IAnswerService answerService, IDiagnosisService diagnosisService, IAnswerDiagnosisService answerDiagnosisService, IResultHistoryService resultHistoryService)
    {
        _questionService = questionService;
        _razorViewTemplateService = razorViewTemplateService;
        _pdfService = pdfService;
        _answerService = answerService;
        _diagnosisService = diagnosisService;
        _answerDiagnosisService = answerDiagnosisService;
        _resultHistoryService = resultHistoryService;
    }

    [HttpPost("question/pdf")]
    public async Task<IActionResult> GenerateQuestion()
    {
        var templateQuestion = await _questionService.FindQuestions("");
        var html = await _razorViewTemplateService.RenderAsync("ReportGenerate/GenerateQuestionList", templateQuestion.ToList());
        var pdfContent = await _pdfService.GeneratePdf(html, null);
        string fileName = $"LaporanPertanyaan{DateTime.Now}.pdf";
        return File(pdfContent, "application/pdf", fileName);
    }
    
    [HttpPost("answer/pdf")]
    public async Task<IActionResult> GenerateAnswer()
    {
        var templateAnswer = await _answerService.FindAnswers("");
        var html = await _razorViewTemplateService.RenderAsync("ReportGenerate/GenerateAnswerList", templateAnswer.ToList());
        var pdfContent = await _pdfService.GeneratePdf(html, null);
        string fileName = $"LaporanJawaban{DateTime.Now}.pdf";
        return File(pdfContent, "application/pdf", fileName);
    }

    [HttpPost("diagnosis/pdf")]
    public async Task<IActionResult> GenerateDiagnosis()
    {
        var diagnosisList = await _diagnosisService.FindDiagnosis("");
        var html = await _razorViewTemplateService.RenderAsync("ReportGenerate/GenerateDiagnosisList", diagnosisList.ToList());
        var pdfContent = await _pdfService.GeneratePdf(html, null);
        string fileName = $"LaporanDiagnosa{DateTime.Now}.pdf";
        return File(pdfContent, "application/pdf", fileName);
    }
    
    [HttpPost("relation/pdf")]
    public async Task<IActionResult> GenerateRelation()
    {
        var relations = await _answerDiagnosisService.FindAllAnswerDiagnosisAsync("");
        var html = await _razorViewTemplateService.RenderAsync("ReportGenerate/GenerateRelationList", relations.ToList());
        var pdfContent = await _pdfService.GeneratePdf(html, null);
        string fileName = $"LaporanRules{DateTime.Now}.pdf";
        return File(pdfContent, "application/pdf", fileName);
    }
    
    [HttpPost("history/pdf")]
    public async Task<IActionResult> GenerateHistories()
    {
        var accountId = User.FindFirst("AccountId")?.Value;
        var relations = await _resultHistoryService.GetAllResultHistories(accountId, null);
        var html = await _razorViewTemplateService.RenderAsync("ReportGenerate/GenerateTestingHistories", relations.ToList());
        var pdfContent = await _pdfService.GeneratePdf(html, null);
        string fileName = $"LaporanRiwayatPengujian{DateTime.Now}.pdf";
        return File(pdfContent, "application/pdf", fileName);
    }
    
    [HttpPost("resultDiagnosis/pdf/{id}")]
    public async Task<IActionResult> GenerateResultDiagnosis([FromRoute] string id)
    {
        var resultHistory = await _resultHistoryService.GetResultHistoryById(id);
        var html = await _razorViewTemplateService.RenderAsync("ReportGenerate/GenerateDetailTesting", resultHistory);
        var pdfContent = await _pdfService.GeneratePdf(html, null);
        string fileName = $"LaporanHasil{resultHistory.TestingCode}.pdf";
        return File(pdfContent, "application/pdf", fileName);
    }
}