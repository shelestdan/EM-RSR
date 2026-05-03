import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_map_work_types_shape" AS ENUM('square', 'circleInCircle', 'diamond', 'document', 'squareInSquare', 'logo');
  CREATE TABLE "map_regions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "map_years" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" numeric NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "map_work_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"color" varchar DEFAULT '#546E7A',
  	"shape" "enum_map_work_types_shape" DEFAULT 'square' NOT NULL,
  	"public_filter" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  INSERT INTO "map_regions" ("label", "slug", "sort_order") VALUES
    ('Краснодарский край', 'krasnodar', 100),
    ('Санкт-Петербург', 'spb', 101),
    ('Ленинградская область', 'lenobl', 102),
    ('Ростовская область', 'rostov', 103),
    ('Ставропольский край', 'stavropol', 104),
    ('Другой регион', 'other', 105);
  INSERT INTO "map_years" ("year", "sort_order") VALUES
    (2026, 100),
    (2025, 101),
    (2024, 102),
    (2023, 103),
    (2022, 104),
    (2021, 105),
    (2020, 106),
    (2019, 107),
    (2018, 108),
    (2017, 109);
  INSERT INTO "map_work_types" ("label", "slug", "color", "shape", "public_filter", "sort_order") VALUES
    ('Проектные работы и изыскательские работы', 'combined', '#1565C0', 'squareInSquare', true, 100),
    ('Инженерные изыскания и кадастр', 'surveys', '#2E7D32', 'circleInCircle', true, 101),
    ('Водоснабжение', 'water', '#00ACC1', 'square', true, 102),
    ('Канализация', 'sewer', '#8D6E63', 'square', true, 103),
    ('Газоснабжение', 'gas', '#FBC02D', 'square', true, 104),
    ('Электроснабжение', 'electricity', '#7E57C2', 'square', true, 105),
    ('Теплотрасса', 'heating', '#E53935', 'square', true, 106),
    ('Котельные', 'boiler', '#C62828', 'square', true, 107),
    ('Иные объекты', 'other', '#546E7A', 'square', true, 108),
    ('Авторский надзор', 'authorSupervision', '#00897B', 'diamond', true, 109),
    ('Сопровождение', 'support', '#37474F', 'document', true, 110),
    ('Офисы', 'office', null, 'logo', true, 111);
  ALTER TABLE "map_markers" ALTER COLUMN "category" DROP NOT NULL;
  ALTER TABLE "map_markers" ALTER COLUMN "region" DROP NOT NULL;
  ALTER TABLE "map_markers" ALTER COLUMN "year" DROP NOT NULL;
  ALTER TABLE "map_markers" ADD COLUMN "region_ref_id" integer;
  ALTER TABLE "map_markers" ADD COLUMN "year_ref_id" integer;
  ALTER TABLE "map_markers" ADD COLUMN "work_type_ref_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "map_regions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "map_years_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "map_work_types_id" integer;
  CREATE UNIQUE INDEX "map_regions_slug_idx" ON "map_regions" USING btree ("slug");
  CREATE INDEX "map_regions_updated_at_idx" ON "map_regions" USING btree ("updated_at");
  CREATE INDEX "map_regions_created_at_idx" ON "map_regions" USING btree ("created_at");
  CREATE UNIQUE INDEX "map_years_year_idx" ON "map_years" USING btree ("year");
  CREATE INDEX "map_years_updated_at_idx" ON "map_years" USING btree ("updated_at");
  CREATE INDEX "map_years_created_at_idx" ON "map_years" USING btree ("created_at");
  CREATE UNIQUE INDEX "map_work_types_slug_idx" ON "map_work_types" USING btree ("slug");
  CREATE INDEX "map_work_types_updated_at_idx" ON "map_work_types" USING btree ("updated_at");
  CREATE INDEX "map_work_types_created_at_idx" ON "map_work_types" USING btree ("created_at");
  ALTER TABLE "map_markers" ADD CONSTRAINT "map_markers_region_ref_id_map_regions_id_fk" FOREIGN KEY ("region_ref_id") REFERENCES "public"."map_regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_markers" ADD CONSTRAINT "map_markers_year_ref_id_map_years_id_fk" FOREIGN KEY ("year_ref_id") REFERENCES "public"."map_years"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_markers" ADD CONSTRAINT "map_markers_work_type_ref_id_map_work_types_id_fk" FOREIGN KEY ("work_type_ref_id") REFERENCES "public"."map_work_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_regions_fk" FOREIGN KEY ("map_regions_id") REFERENCES "public"."map_regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_years_fk" FOREIGN KEY ("map_years_id") REFERENCES "public"."map_years"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_work_types_fk" FOREIGN KEY ("map_work_types_id") REFERENCES "public"."map_work_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "map_markers_region_ref_idx" ON "map_markers" USING btree ("region_ref_id");
  CREATE INDEX "map_markers_year_ref_idx" ON "map_markers" USING btree ("year_ref_id");
  CREATE INDEX "map_markers_work_type_ref_idx" ON "map_markers" USING btree ("work_type_ref_id");
  CREATE INDEX "payload_locked_documents_rels_map_regions_id_idx" ON "payload_locked_documents_rels" USING btree ("map_regions_id");
  CREATE INDEX "payload_locked_documents_rels_map_years_id_idx" ON "payload_locked_documents_rels" USING btree ("map_years_id");
  CREATE INDEX "payload_locked_documents_rels_map_work_types_id_idx" ON "payload_locked_documents_rels" USING btree ("map_work_types_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "map_markers" DROP CONSTRAINT "map_markers_region_ref_id_map_regions_id_fk";
  
  ALTER TABLE "map_markers" DROP CONSTRAINT "map_markers_year_ref_id_map_years_id_fk";
  
  ALTER TABLE "map_markers" DROP CONSTRAINT "map_markers_work_type_ref_id_map_work_types_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_map_regions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_map_years_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_map_work_types_fk";
  
  DROP INDEX "map_markers_region_ref_idx";
  DROP INDEX "map_markers_year_ref_idx";
  DROP INDEX "map_markers_work_type_ref_idx";
  DROP INDEX "payload_locked_documents_rels_map_regions_id_idx";
  DROP INDEX "payload_locked_documents_rels_map_years_id_idx";
  DROP INDEX "payload_locked_documents_rels_map_work_types_id_idx";
  ALTER TABLE "map_markers" ALTER COLUMN "category" SET NOT NULL;
  ALTER TABLE "map_markers" ALTER COLUMN "region" SET NOT NULL;
  ALTER TABLE "map_markers" ALTER COLUMN "year" SET NOT NULL;
  ALTER TABLE "map_markers" DROP COLUMN "region_ref_id";
  ALTER TABLE "map_markers" DROP COLUMN "year_ref_id";
  ALTER TABLE "map_markers" DROP COLUMN "work_type_ref_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "map_regions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "map_years_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "map_work_types_id";
  ALTER TABLE "map_regions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "map_years" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "map_work_types" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "map_regions" CASCADE;
  DROP TABLE "map_years" CASCADE;
  DROP TABLE "map_work_types" CASCADE;
  DROP TYPE "public"."enum_map_work_types_shape";`)
}
