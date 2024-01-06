namespace SpdKecPornografiWeb.ViewModels;

public class ResultHistoryResponseDto
{
    public string Id { get; set; }
    public string TestingCode { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public AccountDto? Account { get; set; }
    public DiagnosisResponseDto? Diagnosis { get; set; }
}