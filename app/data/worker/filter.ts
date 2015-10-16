import {is} from '../util/is';

export interface FilterMap {}
export function filter(q: any, ctx: any, filterMap: FilterMap) {
    var filters = [], x;
    for (var filter in filterMap) {
        if (filter === 'search') {
            for (var i = 0; i < this.fullTextSearchColumnNames.length; i++) {
                x = this.fullTextSearchColumnNames[i].split('.');
                filters.push({
                                    table: x[0],
                                    column: x[1],
                                    op: 'match',
                                    val: filterMap[filter],
                                    inclusive: false
                                })
            }
        }
        else {
            x = filter.split('.');
            filters.push({
                                table: x[0],
                                column: x[1],
                                op: x[2],
                                val: filterMap[filter],
                                inclusive: true
                            });
        }
    }
    if (filters.length === 0) {
        return q;
    } // no where clause
    var predicatesAnd = [], predicatesOr = [];
    for (var i = 0; i < filters.length; i++) {
        var f = filters[i];

        if (f.inclusive) {
            if (is.array(f.val)) {
                predicatesAnd.push(ctx[f.table][f.column][f.op].apply(this, f.val));
            } else {
                predicatesAnd.push(ctx[f.table][f.column][f.op](f.val))
            }
        }
        else {
            if (is.array(f.val)) {
                predicatesOr.push(ctx[f.table][f.column][f.op].apply(this, f.val));
            } else {
                predicatesOr.push(ctx[f.table][f.column][f.op](f.val))
            }
        }
    }
    if (predicatesOr.length > 0) {
        predicatesAnd.push(lf.op.or.apply(this, predicatesOr));
    }
    return q.where(lf.op.and.apply(this, predicatesAnd));
}