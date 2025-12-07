exports.up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("accounts", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: { type: "uuid", notNull: true },
    currency: { type: "varchar(10)", notNull: true },
    balance: { type: "numeric(14,2)", notNull: true, default: 0 },
    status: { type: "varchar(20)", notNull: true, default: "ACTIVE" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("accounts", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("accounts");
};
