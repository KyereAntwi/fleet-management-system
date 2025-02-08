namespace Odatey.FleetManagementSystem.Domain.WorkSpaces.ValueObjects;

public record WorkspaceId
{
    public Guid Value { get; } = Guid.Empty;

    private WorkspaceId(Guid value) => Value = value;

    public static WorkspaceId Of(Guid value)
    {
        ArgumentNullException.ThrowIfNull(value);
        if (value == Guid.Empty)
        {
            throw new DomainExceptions("Workspace  Id cannot be empty or null");
        }

        return new WorkspaceId(value);
    }
}