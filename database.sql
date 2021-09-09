CREATE TABLE "tasks" (
	"id" SERIAL,
	"task" VARCHAR(600),
	"completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
    ("task")
VALUES
    ('Do laundry'),
    ('Get groceries'),
    ('Be cool');