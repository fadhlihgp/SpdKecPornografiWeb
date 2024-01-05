using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface ITrxTestingService
{
    public Task<DiagnosisResponseDto> GetDiagnosisByAnswerIds(List<string> answerIds);
}