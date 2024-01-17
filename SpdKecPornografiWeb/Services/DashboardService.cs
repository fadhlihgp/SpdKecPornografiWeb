using SpdKecPornografiWeb.Models;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.Services;

public class DashboardService : IDashboardService
{
    private readonly IRepository<Account> _accountRepository;
    private readonly IRepository<Question> _questionRepository;
    private readonly IRepository<Answer> _answerRepository;
    private readonly IRepository<Diagnosis> _diagnosisRepository;
    private readonly IRepository<AnswerDiagnosis> _answerDiagnosisRepository;
    private readonly IRepository<ResultHistory> _resultHistoryRepository;

    public DashboardService(IAccountService accountService, IRepository<ResultHistory> resultHistoryRepository, IRepository<AnswerDiagnosis> answerDiagnosisRepository, IRepository<Diagnosis> diagnosisRepository, IRepository<Answer> answerRepository, IRepository<Question> questionRepository, IRepository<Account> accountRepository)
    {
        _resultHistoryRepository = resultHistoryRepository;
        _answerDiagnosisRepository = answerDiagnosisRepository;
        _diagnosisRepository = diagnosisRepository;
        _answerRepository = answerRepository;
        _questionRepository = questionRepository;
        _accountRepository = accountRepository;
    }

    public DashboardResponseDto GetDashboard(string accountId)
    {
        return new DashboardResponseDto
        {
            AccountAmount = _accountRepository.Count(),
            QuestionAmount = _questionRepository.Count(),
            AnswerAmount = _answerRepository.Count(),
            DiagnosisAmount = _diagnosisRepository.Count(d => !d.IsDeleted),
            RelationAmount = _answerDiagnosisRepository.Count(),
            TestingHistoryAmount = _resultHistoryRepository.Count(r => r.AccountId.Equals(accountId))
        };
    }
}