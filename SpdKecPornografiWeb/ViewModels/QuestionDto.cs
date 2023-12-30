using SpdKecPornografiWeb.Models;

namespace SpdKecPornografiWeb.ViewModels;

public class QuestionRequestDto
{
    public string QuestionCode { get; set; }
    public string QuestionName { get; set; }
}

public class QuestionResponseDto
{
    public string Id { get; set; }
    public string QuestionName { get; set; }
    public string QuestionCode { get; set; }
    public DateTime? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    public ICollection<AnswerResponseDto>? Answers { get; set; }
}