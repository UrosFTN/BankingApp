exports.up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  pgm.createTable("notifications", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: { type: "uuid", notNull: true },
    type: { type: "varchar(20)", notNull: true },
    title: { type: "varchar(255)", notNull: true },
    message: { type: "text", notNull: true },
    metadata: { type: "text" },
    is_read: { type: "boolean", notNull: true, default: false },
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

  pgm.createIndex("notifications", "user_id");
  pgm.createIndex("notifications", ["user_id", "is_read"]);
};

exports.down = (pgm) => {
  pgm.dropTable("notifications");
};
