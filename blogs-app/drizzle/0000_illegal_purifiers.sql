CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL
);
