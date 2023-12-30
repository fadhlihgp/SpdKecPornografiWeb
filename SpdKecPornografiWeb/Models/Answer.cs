using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpdKecPornografiWeb.Models;

[Table("Answer")]
public class Answer
{
    [Key] public string Id { get; set; } = new Guid().ToString();
    public string Name { get; set; }
    public string AnswerCode { get; set; }
    public string? QuestionId { get; set; }
    [ForeignKey("QuestionId")] public virtual Question? Question { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.Now;
    public string? CreatedById { get; set; }
    [ForeignKey("CreatedById")] public virtual Account? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    public string? UpdatedById { get; set; }
    [ForeignKey("UpdatedById")] public virtual Account? UpdatedBy { get; set; }
}