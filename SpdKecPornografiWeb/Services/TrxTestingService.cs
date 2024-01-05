using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class TrxTestingService : ITrxTestingService
{
    private ITrxTestingRepository _trxTestingRepository;

    public TrxTestingService(ITrxTestingRepository trxTestingRepository)
    {
        _trxTestingRepository = trxTestingRepository;
    }

    public Task<DiagnosisResponseDto> GetDiagnosisByAnswerIds(List<string> answerIds)
    {
        throw new NotImplementedException();
    }
}