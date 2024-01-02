using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IDiagnosisService
{
    public Task AddDiagnosisAsync(string accountId, DiagnosisRequestDto diagnosisRequestDto);
    public Task<DiagnosisResponseDto> FindDiagnosisById(string diagnosisId);
    public Task<IEnumerable<DiagnosisResponseDto>> FindDiagnosis(string? name);
    public Task UpdateDiagnosisAsync(string accountId, string diagnosisId, DiagnosisRequestDto diagnosisResponseDto);
    public Task DeleteDiagnosis(string accountId, string diagnosisId);
    public string GenerateDiagnosisCode();
}