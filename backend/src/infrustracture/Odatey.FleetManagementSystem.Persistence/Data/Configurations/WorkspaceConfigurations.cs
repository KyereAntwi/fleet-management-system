namespace Odatey.FleetManagementSystem.Repositories.Data.Configurations;

public class WorkspaceConfigurations : IEntityTypeConfiguration<Workspace>
{
    public void Configure(EntityTypeBuilder<Workspace> builder)
    {
        builder.HasKey(w => w.Id);
        builder.Property(w => w.Id).HasConversion(workspaceId => workspaceId.Value, dbId => WorkspaceId.Of(dbId));
        builder.Property(w => w.WorkspaceTitle).HasMaxLength(500).IsRequired();
    }
}