const ARTICLE = `CREATE TABLE IF NOT EXISTS "article" (
	"id" VARCHAR(36) NOT NULL,
	"title" VARCHAR(26) NULL DEFAULT NULL,
	"article" VARCHAR(8000) NULL DEFAULT NULL,
	"category_id" VARCHAR(36) NULL DEFAULT NULL,
	"create_time" DATE NULL DEFAULT NULL,
	"modify_time" DATE NULL DEFAULT NULL,
	"author" VARCHAR(6) NULL DEFAULT NULL,
	"abstract" VARCHAR(300) NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	INDEX "" ("id"),
	INDEX "" ("category_id")
)
;
COMMENT ON COLUMN "article"."id" IS E'';
COMMENT ON COLUMN "article"."title" IS E'';
COMMENT ON COLUMN "article"."article" IS E'';
COMMENT ON COLUMN "article"."category_id" IS E'';
COMMENT ON COLUMN "article"."create_time" IS E'';
COMMENT ON COLUMN "article"."modify_time" IS E'';
COMMENT ON COLUMN "article"."author" IS E'';
COMMENT ON COLUMN "article"."abstract" IS E'';`

const CATEGORY = `CREATE TABLE IF NOT EXISTS "category" (
	"id" VARCHAR(36) NOT NULL,
	"category" VARCHAR(10) NULL DEFAULT NULL,
	"alias" VARCHAR(255) NULL DEFAULT NULL,
	PRIMARY KEY ("id")
)
;
COMMENT ON COLUMN "category"."id" IS E'';
COMMENT ON COLUMN "category"."category" IS E'';
COMMENT ON COLUMN "category"."alias" IS E'';
`;

const USER = `CREATE TABLE IF NOT EXISTS "user" (
	"id" VARCHAR(36) NOT NULL,
	"user_name" VARCHAR(64) NULL DEFAULT NULL,
	"create_time" DATE NULL DEFAULT NULL,
	"phone" VARCHAR(11) NULL DEFAULT NULL,
	"address" VARCHAR(255) NULL DEFAULT NULL,
	"head" VARCHAR(255) NULL DEFAULT NULL,
	"password" VARCHAR(255) NULL DEFAULT NULL,
	"email" VARCHAR(255) NULL DEFAULT NULL,
	"nick" VARCHAR(255) NULL DEFAULT NULL,
	"lv" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	INDEX "" ("user_name"),
	INDEX "" ("id")
)
;
COMMENT ON COLUMN "user"."id" IS E'';
COMMENT ON COLUMN "user"."user_name" IS E'';
COMMENT ON COLUMN "user"."create_time" IS E'';
COMMENT ON COLUMN "user"."phone" IS E'';
COMMENT ON COLUMN "user"."address" IS E'';
COMMENT ON COLUMN "user"."head" IS E'';
COMMENT ON COLUMN "user"."password" IS E'';
COMMENT ON COLUMN "user"."email" IS E'';
COMMENT ON COLUMN "user"."nick" IS E'';
COMMENT ON COLUMN "user"."lv" IS E'';
`;

const COMMENT = `CREATE TABLE IF NOT EXISTS "comment" (
	"id" VARCHAR(36) NOT NULL,
	"comment" VARCHAR(255) NULL DEFAULT NULL,
	"article_id" VARCHAR(36) NULL DEFAULT NULL,
	"parent_id" VARCHAR(36) NULL DEFAULT NULL,
	"user_id" VARCHAR(36) NULL DEFAULT NULL,
	"client" VARCHAR(255) NULL DEFAULT NULL,
	"address" VARCHAR(255) NULL DEFAULT NULL,
	"create_time" DATE NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	INDEX "" ("article_id")
)
;
COMMENT ON COLUMN "comment"."id" IS E'';
COMMENT ON COLUMN "comment"."comment" IS E'';
COMMENT ON COLUMN "comment"."article_id" IS E'';
COMMENT ON COLUMN "comment"."parent_id" IS E'';
COMMENT ON COLUMN "comment"."user_id" IS E'';
COMMENT ON COLUMN "comment"."client" IS E'';
COMMENT ON COLUMN "comment"."address" IS E'';
COMMENT ON COLUMN "comment"."create_time" IS E'';
`;

const PHOTO = `CREATE TABLE IF NOT EXISTS "photo" (
	"id" UUID NOT NULL,
	"src" VARCHAR(2000) NULL DEFAULT NULL,
	"remark" VARCHAR(1000) NULL DEFAULT NULL,
	"title" VARCHAR(255) NULL DEFAULT NULL,
	"user_id" UUID NULL DEFAULT NULL,
	"create_time" DATE NULL DEFAULT NULL,
	PRIMARY KEY ("id")
)
;
COMMENT ON COLUMN "photo"."id" IS E'';
COMMENT ON COLUMN "photo"."src" IS E'';
COMMENT ON COLUMN "photo"."remark" IS E'';
COMMENT ON COLUMN "photo"."title" IS E'';
COMMENT ON COLUMN "photo"."user_id" IS E'';
COMMENT ON COLUMN "photo"."create_time" IS E'';
`;


module.exports = {
    ARTICLE,
    CATEGORY,
    COMMENT,
    USER,
    PHOTO
}