using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface ITrxTestingService
{
    public DiagnosisResponseDto GetDiagnosisByAnswerIds(List<string> answerIds);
}