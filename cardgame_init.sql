CREATE DATABASE katana WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';

ALTER DATABASE katana OWNER TO postgres;

\connect katana;

CREATE SCHEMA cardgame;

ALTER SCHEMA cardgame OWNER TO postgres;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

SET default_tablespace = '';

SET default_with_oids = false;

CREATE DATABASE "katana-test" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';

ALTER DATABASE "katana-test" OWNER TO postgres;

\connect "katana-test";

CREATE SCHEMA cardgame;

ALTER SCHEMA cardgame OWNER TO postgres;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;