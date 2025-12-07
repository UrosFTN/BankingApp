exports.up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("transactions", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    type: { type: "varchar(20)", notNull: true },
    from_account_id: { type: "uuid" },
    to_account_id: { type: "uuid" },
    amount: { type: "numeric(14,2)", notNull: true },
    currency: { type: "varchar(10)", notNull: true },
    status: { type: "varchar(20)", notNull: true, default: "PENDING" },
    description: { type: "text" },
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

  pgm.createIndex("transactions", "from_account_id");
  pgm.createIndex("transactions", "to_account_id");
};

exports.down = (pgm) => {
  pgm.dropTable("transactions");
};
