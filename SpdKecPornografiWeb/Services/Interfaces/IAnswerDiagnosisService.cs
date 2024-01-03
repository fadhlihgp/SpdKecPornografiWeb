using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IAnswerDiagnosisService
{
    public Task AddAnswerDiagnosisAsync(string accountId, AnswerDiagnosisRequestDto answerDiagnosisRequestDto);

    public Task UpdateAnswerDiagnosisAsync(string accountId, string answerDiagnosisId,
        AnswerDiagnosisRequestDto answerDiagnosisRequest);

    public Task<IEnumerable<AnswerDiagnosisResponseDto>> FindAllAnswerDiagnosisAsync(string? code = "");
    public Task<AnswerDiagnosis> FindAnswerDiagnosisByIdItself(string answerId, string diagnosisId);
    public Task<AnswerDiagnosisResponseDto> FindAnswerDiagnosisById(string answerDiagnosisId);
    public Task DeleteAnswerDiagnosisByAnswerId(string answerId);
    public Task DeleteAnswerDiagnosisByDiagnosisId(string diagnosisId);
}