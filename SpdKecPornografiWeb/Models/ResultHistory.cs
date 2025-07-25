using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpdKecPornografiWeb.Models;

[Table("ResultHistory")]
public class ResultHistory
{
    [Key] public string Id { get; set; } = Guid.NewGuid().ToString();
    public string TestCode { get; set; }
    public string DiagnosisId { get; set; }
    public virtual Diagnosis? Diagnosis { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public string AccountId { get; set; }
    public virtual Account? Account { get; set; }
}