const { ErrorCodes, SubcategoriesConstants } = require("../../constants");
const { Validators } = require("../../helpers");
const SubcategoriesManager = require("./SubcategoriesManager");

class SubcategoriesController {
    static async SubcategoriesByParentId(req, res) {
        try {
            const { parentId } = req.params;

            const subcategories = await SubcategoriesManager.SubcategoriesByParentId(parentId);

            if(!subcategories || subcategories.length === 0) {
                return res.status(ErrorCodes.SUCCESS).json({
                    success: true,
                    message: `No subcategories with the parentId: ${parentId} found`
                })
            }

            return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                data: subcategories
            });

        } catch (error) {
            console.log(`SubcategoriesFromParentId:: Request to get all the subcategories from parent Id failed. data:: ${error}`);

            return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
                success: false,
                message: error.reportError ? error.message : SubcategoriesConstants.Messages.GET_SUBCATEGORIES_FROM_PARENTID_FAILED
            });
        }
    }
}

module.exports = SubcategoriesController;