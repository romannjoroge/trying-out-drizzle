import { primaryKey, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const students = pgTable("students", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    dob: text("date_of_birth").notNull().default(sql`NOW()`),
});

export const classes = pgTable("classes", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
});

export const classStudents = pgTable("classes_students", {
    studentId: integer("student_id").notNull().references(() => students.id),
    classId: integer("class_id").notNull().references(() => classes.id)
}, (table) => {
    return {
        pk: primaryKey({columns: [table.classId, table.studentId] }),
        pkWithCustomName: primaryKey({ name: 'custom_class_student', columns: [table.classId, table.studentId]})
    };
});