namespace SpdKecPornografiWeb.ViewModels;

public class DiagnosisRequestDto
{
    public string DiagnosisCode { get; set; }
    public string DiagnosisName { get; set; }
    public string DiagnosisDescription { get; set; }
    public string DiagnosisSuggestion { get; set; }
}

public class DiagnosisResponseDto
{
    public string Id { get; set; }
    public string DiagnosisName { get; set; }
    public string DiagnosisCode { get; set; }
    public string? DiagnosisDescription { get; set; }
    public string? DiagnosisSuggestion { get; set;}
    public DateTime? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
}