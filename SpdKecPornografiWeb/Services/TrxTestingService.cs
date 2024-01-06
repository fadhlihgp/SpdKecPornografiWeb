using SpdKecPornografiWeb.Exceptions;
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

    public DiagnosisResponseDto GetDiagnosisByAnswerIds(List<string> answerIds)
    {
        var findByAnswerIds = _trxTestingRepository.FindDiagnosisByAnswerIds(answerIds);
        if (findByAnswerIds == null) throw new NotFoundException("Maaf, data diagnosa tidak ditemukan");
        return new DiagnosisResponseDto
        {
            Id = findByAnswerIds.Id,
            DiagnosisName = findByAnswerIds.Name,
            DiagnosisCode = findByAnswerIds.Code,
            DiagnosisDescription = findByAnswerIds.Description,
            DiagnosisSuggestion = findByAnswerIds.Suggestion
        };
    }
}