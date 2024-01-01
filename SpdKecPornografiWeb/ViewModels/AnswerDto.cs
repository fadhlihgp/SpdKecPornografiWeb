namespace SpdKecPornografiWeb.ViewModels;

public class AnswerRequestDto
{
    public string QuestionId { get; set; }
    public string AnswerCode { get; set; }
    public string AnswerName { get; set; }
}

public class AnswerResponseDto
{
    public string Id { get; set; }
    public string? QuestionId { get; set; }
    public string? QuestionCode { get; set; }
    public string? QuestionName { get; set; }
    public string AnswerCode { get; set; }
    public string AnswerName { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
}