namespace Odatey.FleetManagementSystem.Repositories.Data.Configurations;

public class AccidentRepairCostConfigurations : IEntityTypeConfiguration<AccidentRepairCost>
{
    public void Configure(EntityTypeBuilder<AccidentRepairCost> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(a => a.Id)
            .HasConversion(a => a.Value, dbId => AccidentRepairCostId.Of(dbId));
        builder.Property(a => a.VehicleId).HasConversion(a => a.Value, dbId => VehicleId.Of(dbId));
    }
}