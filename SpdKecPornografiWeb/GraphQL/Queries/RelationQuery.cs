using HotChocolate.AspNetCore.Authorization;
using SpdKecPornografiWeb.Services.Interfaces;
using SpdKecPornografiWeb.ViewModels;

namespace SpdKecPornografiWeb.GraphQL.Queries;

[ExtendObjectType("Query")]
[Authorize]
public class RelationQuery
{
    private readonly IAnswerDiagnosisService _answerDiagnosisService;

    public RelationQuery(IAnswerDiagnosisService answerDiagnosisService)
    {
        _answerDiagnosisService = answerDiagnosisService;
    }
    
    public async Task<IEnumerable<AnswerDiagnosisResponseDto>> GetDiagnosisIdsByAnswerId(string code)
    {
        return await _answerDiagnosisService.FindAllAnswerDiagnosisAsync(code);
    }
    
    public async Task<AnswerDiagnosisResponseDto> GetAnswerDiagnosisById(string answerDiagnosisId)
    {
        return await _answerDiagnosisService.FindAnswerDiagnosisById(answerDiagnosisId);
    }
}