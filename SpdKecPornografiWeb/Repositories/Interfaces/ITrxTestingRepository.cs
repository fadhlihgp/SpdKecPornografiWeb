using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Repositories.Interfaces;

public interface ITrxTestingRepository
{
    public Diagnosis? FindDiagnosisByAnswerIds(List<string> answerIds);
}