import { GraphQLScalarType, Kind } from "graphql";

export const dateTimeScalar = new GraphQLScalarType({
    name: "DateTime",
    description: "Custom DateTime scalar type (ISO 8601 format)",
    serialize(value: unknown): string {
        if (value instanceof Date) {
            return value.toISOString(); // Convert Date to ISO string for JSON
        }
        throw new Error(
            "GraphQL DateTime Scalar serializer expected a `Date` object"
        );
    },
    parseValue(value: unknown): Date | null {
        if (typeof value === "string" || typeof value === "number") {
            return new Date(value); // Convert string or number to Date
        }
        throw new Error(
            "GraphQL DateTime Scalar parser expected a `string` or `number`"
        );
    },
    parseLiteral(ast): Date | null {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value); // Convert string literal to Date
        }
        return null; // Invalid literal
    },
});

export const Time = new GraphQLScalarType({
    name: 'Time',
    description: 'A time, represented as an ISO-8601 string',
    serialize(value: unknown): string {
        if (value instanceof Date) {
            return value.toISOString().split('T')[1].split('.')[0]; // Convert Date to time string (HH:MM:SS)
        }
        throw new Error(
            "GraphQL Time Scalar serializer expected a `Date` object"
        );
    },
    parseValue(value: unknown): Date | null {
        if (typeof value === "string") {
            return new Date(`1970-01-01T${value}Z`); // Convert incoming string to Date
        }
        throw new Error(
            "GraphQL Time Scalar parser expected a `string`"
        );
    },
    parseLiteral(ast): Date | null {
        if (ast.kind === Kind.STRING) {
            return new Date(`1970-01-01T${ast.value}Z`); // Convert hard-coded string to Date
        }
        return null; // Invalid literal
    },
});