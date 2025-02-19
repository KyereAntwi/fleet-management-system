// Global using directives

global using System.Security.Claims;
global using FastEndpoints;
global using FluentValidation;
global using MediatR;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.IdentityModel.Tokens;
global using Microsoft.OpenApi.Models;
global using Odatey.FleetManagementSystem.Api.DI;
global using Odatey.FleetManagementSystem.Application.DI;
global using Odatey.FleetManagementSystem.Application.Features.Tenants.Commands;
global using Odatey.FleetManagementSystem.Application.Features.Workspaces.Commands;
global using Odatey.FleetManagementSystem.Application.Features.Workspaces.Queries;
global using Odatey.FleetManagementSystem.Application.Utilities;
global using Odatey.FleetManagementSystem.Contracts.Requests.TenantManagement;
global using Odatey.FleetManagementSystem.Contracts.Requests.Workspaces;
global using Odatey.FleetManagementSystem.Contracts.Responses;
global using Odatey.FleetManagementSystem.Domain.Tenants.Enums;
global using Odatey.FleetManagementSystem.ExternalServices.DI;
global using Odatey.FleetManagementSystem.Persistence.TenantsManagement.DI;
global using Odatey.FleetManagementSystem.Repositories.DI;
global using Scalar.AspNetCore;
global using Serilog;
global using static System.Enum;