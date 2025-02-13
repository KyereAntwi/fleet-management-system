namespace Odatey.FleetManagementSystem.Application.Utilities.Dtos;

public class PagedResponse<TResponse> where TResponse : class
{
    public int Count { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public IEnumerable<TResponse> Data { get; set; } = [];
}