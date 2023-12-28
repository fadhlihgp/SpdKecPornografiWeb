using System.Linq.Expressions;

namespace SpdKecPornografiWeb.Repositories.Interfaces;

public interface IPersistence
{
    Task SaveChangesAsync();
    void SaveChanges();
    Task<T> ExecuteTransaction<T>(Func<Task<T>> transaction);
}