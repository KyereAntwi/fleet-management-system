namespace Odatey.FleetManagementSystem.Repositories.Data.Configurations;

public class MaintenanceCostConfigurations : IEntityTypeConfiguration<MaintenanceCost>
{
    public void Configure(EntityTypeBuilder<MaintenanceCost> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(a => a.Id)
            .HasConversion(a => a.Value, dbId => MaintenanceCostId.Of(dbId));
    }
}