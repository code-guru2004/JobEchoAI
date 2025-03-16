CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"imageUrl" text,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
