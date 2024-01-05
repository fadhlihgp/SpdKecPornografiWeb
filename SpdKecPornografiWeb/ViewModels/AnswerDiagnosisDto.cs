namespace SpdKecPornografiWeb.ViewModels;

public class AnswerDiagnosisRequestDto
{
    public string AnswerId { get; set; }
    public string DiagnosisId { get; set; }
}

public class AnswerDiagnosisResponseDto
{
    public string Id { get; set; }
    public string? DiagnosisId { get; set; }
    public string? DiagnosisCode { get; set; }
    public string? DiagnosisName { get; set; }
    public string? DiagnosisDescription { get; set; }
    public string? DiagnosisSuggestion { get; set; }
    public string QuestionId { get; set;}
    public string QuestionCode { get; set; }
    public string QuestionName { get; set; }
    public string? AnswerId { get; set; }
    public string AnswerCode { get; set; }
    public string AnswerName { get; set; }
    public DateTime? UpdatedAt { get; set;}
    public string? UpdatedBy { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
}