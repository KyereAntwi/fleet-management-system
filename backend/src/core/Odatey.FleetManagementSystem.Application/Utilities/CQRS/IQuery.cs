namespace Odatey.FleetManagementSystem.Application.Utilities.CQRS;

public interface IQuery<out TResult> : IRequest<TResult> where TResult : notnull;