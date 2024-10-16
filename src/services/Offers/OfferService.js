const { db } = require("../../confic/db");

const addNewOfferServer = async (input, output) => {
  const {
    offerName,
    description,
    discountType,
    discountValue,
    startDate,
    endDate,
    tagId,
    isPrimary,
  } = input;
  const offerTag = input.offerTag.toUpperCase();
  const image = `/uploads/${input.image}`;

  if (!image) {
    const insertQuery = `INSERT INTO offer (name, description, discountType, discountValue, start_date, end_date, deleted) VALUES (?, ?, ?, ?, ?, ?, "N");
    SET @last_offer_id = LAST_INSERT_ID();
    INSERT INTO offer_details (offer_id, offer_tag, tag_id) VALUES (@last_offer_id, ?, ?)`;
    db.query(
      insertQuery,
      [
        offerName,
        description,
        discountType,
        discountValue,
        startDate,
        endDate,
        offerTag,
        tagId,
      ],
      (err, result) => {
        if (err) {
          output({ error: { description: err.message } }, null);
        } else {
          output(null, { message: "Offer created Successfully" });
        }
      }
    );
  } else {
    const insertQuery = `INSERT INTO offer (name, description, discountType, discountValue, start_date, end_date, deleted) VALUES (?, ?, ?, ?, ?, ?, "N");
    SET @last_offer_id = LAST_INSERT_ID();
    INSERT INTO offer_details (offer_id, offer_tag, tag_id) VALUES (@last_offer_id, ?, ?);
    INSERT INTO productimage (image_id, image_url, image_tag, alt_text, is_primary) VALUES (@last_offer_id, ?, ?, ?, ?);`;

    db.query(
      insertQuery,
      [
        offerName,
        description,
        discountType,
        discountValue,
        startDate,
        endDate,
        offerTag,
        tagId,
        image,
        offerTag,
        offerName,
        isPrimary,
      ],
      (err, result) => {
        if (err) {
          output({ error: { description: err.message } }, null);
        } else {
          output(null, { message: "Offer created Successfully" });
        }
      }
    );
  }
};

const getOfferService = async (input, output) => {
  const { limit, offset } = input;
  const getOfferQuery = `
    SELECT 
    off.offer_id,
    off.description,
    off.discountType,
    off.discountValue,
    off.start_date,
    off.end_date,
    od.id,
    od.offer_tag,
    od.tag_id
    FROM offer off
    JOIN offer_details od
    ON off.offer_id = od.offer_id
    WHERE off.deleted = "N"
    LIMIT ? OFFSET ?`;
  db.query(
    getOfferQuery,
    [parseInt(limit), parseInt(offset)],
    (err, result) => {
      if (err) {
        output({ error: { description: err.message } }, null);
      } else {
        output(null, result);
      }
    }
  );
};

const updateOfferService = async (input, output) => {
  const {
    offerId,
    offerName,
    description,
    discountType,
    discountValue,
    startDate,
    endDate,
    id,
    tagId,
  } = input;
  const offerTag = input.offerTag.toUpperCase();
  const updateOfferQuery = `
    UPDATE offer SET name = ?, description = ?, discountType = ?, discountValue = ?, start_date = ?, end_date = ? WHERE offer_id = ?;
    UPDATE offer_details SET offer_tag = ?, tag_id = ? WHERE id = ? AND offer_id = ?;
    `;
  db.query(
    updateOfferQuery,
    [
      offerName,
      description,
      discountType,
      discountValue,
      startDate,
      endDate,
      offerId,
      offerTag,
      tagId,
      id,
      offerId,
    ],
    (err, result) => {
      if (err) {
        output({ error: { description: err.message } }, null);
      } else {
        output(null, { message: "Offer updated Successfully" });
      }
    }
  );
};

const deleteOfferService = async (offerId, output) => {
  const deleteQuery = `UPDATE offer SET deleted = "Y" WHERE offer_id = ?;`;
  db.query(deleteQuery, [offerId], (err, result) => {
    if (err) {
      output({ error: { description: err.message } }, null);
    } else {
      output(null, { message: "Offer Deleted Successfully" });
    }
  });
};

module.exports = {
  addNewOfferServer,
  getOfferService,
  updateOfferService,
  deleteOfferService,
};
