namespace Odatey.FleetManagementSystem.Repositories.Data.Configurations;

public class VehicleConfigurations : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.HasKey(x => x.VehicleId);
        builder.Property(x => x.VehicleId)
            .HasConversion(vehicleId => vehicleId.Value, dbId => VehicleId.Of(dbId));
        
        builder
            .Property(x => x.WorkspaceId)
            .HasConversion(workspaceId => workspaceId.Value, dbId => WorkspaceId.Of(dbId))
            .IsRequired();
        
        builder
            .HasMany(v => v.FuelConsumptions)
            .WithOne()
            .HasForeignKey(f => f.VehicleId);
        
        builder
            .HasMany(v => v.MaintenanceCosts)
            .WithOne()
            .HasForeignKey(m => m.VehicleId);
        
        builder
            .HasMany(v => v.AccidentRepairCosts)
            .WithOne()
            .HasForeignKey(a => a.VehicleId);
    }
}